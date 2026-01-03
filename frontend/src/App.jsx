import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  
  // Auth State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');

  // Data State
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [availableTags, setAvailableTags] = useState([]);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  
  const [editingPostId, setEditingPostId] = useState(null);
  
  // Kategori Ekleme State
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  // YENİ: Etiket Ekleme State
  const [newTagName, setNewTagName] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  useEffect(() => {
    if (user) { fetchPosts(); fetchCategories(); fetchTags(); }
  }, [user]);

  // --- GİRİŞ / KAYIT ---
  const handleAuth = async () => {
    if (!username || !password) { alert("Bilgileri giriniz!"); return; }
    const endpoint = authMode === 'login' ? 'login' : 'register';
    const bodyData = authMode === 'register' ? { username, password, adminKey } : { username, password };

    try {
      const res = await fetch(`http://localhost:3000/users/${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      const data = await res.json();
      if (res.ok) {
        if (authMode === 'login') { setUser(data.user); setAdminKey(''); } 
        else { alert("Kayıt başarılı! Giriş yapın."); setAuthMode('login'); setAdminKey(''); }
      } else { alert(data.message); }
    } catch { alert("Sunucu hatası."); }
  };

  const handleLogout = () => { setUser(null); setPosts([]); setEditingPostId(null); resetForm(); };

  // --- VERİ ÇEKME ---
  const fetchPosts = async () => {
    try { const res = await fetch('http://localhost:3000/posts'); setPosts(await res.json()); } catch { setPosts([]); }
  };
  const fetchCategories = async () => {
    try { const res = await fetch('http://localhost:3000/categories'); if(res.ok) setCategories(await res.json()); } catch { setCategories([]); }
  };
  const fetchTags = async () => {
    try { const res = await fetch('http://localhost:3000/tags'); if(res.ok) setAvailableTags(await res.json()); } catch { setAvailableTags([]); }
  };

  const resetForm = () => {
    setTitle(''); setContent(''); setSelectedCategoryId(''); setSelectedTagIds([]);
    setEditingPostId(null);
  };

  // --- KAYDET / GÜNCELLE ---
  const handleSubmit = async () => {
    if (!title || !content || !selectedCategoryId) { alert("Başlık, içerik ve kategori zorunludur!"); return; }

    const postData = { 
        title, 
        content, 
        categoryId: parseInt(selectedCategoryId), 
        tagIds: selectedTagIds, 
        userId: user.id 
    };

    try {
      let url = 'http://localhost:3000/posts';
      let method = 'POST';

      if (editingPostId) {
        url = `http://localhost:3000/posts/${editingPostId}`;
        method = 'PATCH';
      }

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        alert(editingPostId ? "Yazı güncellendi!" : "Yazı paylaşıldı!");
        resetForm();
        fetchPosts();
      } else {
        const errorData = await res.json();
        alert("Hata Detayı: " + (errorData.message || "Bilinmeyen hata"));
      }
    } catch { alert("Sunucu hatası"); }
  };

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setSelectedCategoryId(post.category ? post.category.id : '');
    setSelectedTagIds(post.tags ? post.tags.map(t => t.id) : []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- KATEGORİ EKLEME ---
  const handleCategoryEkle = async () => {
    try {
      await fetch('http://localhost:3000/categories', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });
      setNewCategoryName(''); setShowCategoryInput(false); fetchCategories();
    } catch { alert("Hata oluştu"); }
  };

  // --- YENİ: ETİKET EKLEME ---
  const handleTagEkle = async () => {
    try {
      await fetch('http://localhost:3000/tags', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTagName }),
      });
      setNewTagName(''); setShowTagInput(false); fetchTags();
    } catch { alert("Hata oluştu"); }
  };

  const handlePostSil = async (id) => {
    if(!confirm("Silmek istediğine emin misin?")) return;
    try {
        const res = await fetch(`http://localhost:3000/posts/${id}`, { 
            method: 'DELETE', headers: { 'user-id': user.id.toString() } 
        });
        if(res.ok) fetchPosts();
        else { const data = await res.json(); alert("Hata: " + (data.message || "Yetkiniz yok!")); }
    } catch { alert("Bağlantı hatası"); }
  };

  const toggleTag = (id) => {
    if (selectedTagIds.includes(id)) setSelectedTagIds(selectedTagIds.filter(t => t !== id));
    else setSelectedTagIds([...selectedTagIds, id]);
  };

  // --- LOGIN EKRANI ---
  if (!user) {
    return (
      <div className="login-container">
        <div className="auth-box">
          <h2 className="auth-title">Giriş Yap</h2>
          <div className="auth-toggle">
            <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Giriş</button>
            <button className={authMode === 'register' ? 'active' : ''} onClick={() => setAuthMode('register')}>Kayıt Ol</button>
          </div>
          <div className="form-group"><label className="label-title">Kullanıcı Adı</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
          <div className="form-group"><label className="label-title">Şifre</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          {authMode === 'register' && (
              <div className="form-group">
                  <label className="label-title" style={{color: '#6366f1'}}>Admin Anahtarı (Opsiyonel)</label>
                  <input type="text" placeholder="Varsa anahtarı girin..." value={adminKey} onChange={(e) => setAdminKey(e.target.value)} />
              </div>
          )}
          <button className="btn-primary" onClick={handleAuth}>{authMode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="app-header">
        <div className="header-content">
          <div className="brand"><h1>Blog<span>Paneli</span></h1></div>
          <div className="user-info">
            <span className="badge">{user.role === 'admin' ? '👑 Yönetici' : '👤 Üye'} : <b>{user.username}</b></span>
            <button className="logout-btn" onClick={handleLogout}>Çıkış</button>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* SOL PANEL - FORM */}
        <div className="sidebar">
          <div className="card form-card">
            <h3>{editingPostId ? '✏️ Yazıyı Düzenle' : '✍️ Yeni Yazı Paylaş'}</h3>
            
            <div className="form-group"><label className="label-title">Başlık</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Etkileyici bir başlık..." /></div>
            
            {/* KATEGORİ ALANI */}
            <div className="form-group">
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
                <label className="label-title">Kategori</label>
                <small className="add-cat-btn" onClick={() => setShowCategoryInput(!showCategoryInput)}>{showCategoryInput ? 'İptal' : '+ Yeni Ekle'}</small>
              </div>
              {showCategoryInput && (<div className="category-add-area"><input type="text" placeholder="Kategori adı..." value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} /><button className="btn-small" onClick={handleCategoryEkle}>Kaydet</button></div>)}
              <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}><option value="">Bir kategori seçin...</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            </div>

            <div className="form-group"><label className="label-title">İçerik</label><textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Neler düşünüyorsun?"></textarea></div>
            
            {/* ETİKET ALANI (YENİ EKLEME ÖZELLİKLİ) */}
            <div className="form-group">
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
                <label className="label-title">Etiketler</label>
                <small className="add-cat-btn" onClick={() => setShowTagInput(!showTagInput)}>{showTagInput ? 'İptal' : '+ Yeni Ekle'}</small>
              </div>
              {showTagInput && (<div className="category-add-area"><input type="text" placeholder="Etiket adı..." value={newTagName} onChange={(e) => setNewTagName(e.target.value)} /><button className="btn-small" onClick={handleTagEkle}>Ekle</button></div>)}
              
              <div className="tag-container">
                {availableTags.map(t => (
                  <button key={t.id} className={`tag-btn ${selectedTagIds.includes(t.id) ? 'selected' : ''}`} onClick={() => toggleTag(t.id)}>#{t.name}</button>
                ))}
              </div>
            </div>
            
            <div style={{display:'flex', gap:'10px'}}>
              <button className="btn-primary" onClick={handleSubmit}>
                {editingPostId ? 'Güncelle' : 'Yayınla'}
              </button>
              {editingPostId && (
                <button className="btn-primary" style={{backgroundColor: '#6b7280'}} onClick={resetForm}>İptal</button>
              )}
            </div>

          </div>
        </div>

        {/* SAĞ PANEL - LİSTE */}
        <div className="content-area">
          <div className="section-title">Son Paylaşımlar</div>
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-meta">
                <span className="author">👤 {post.user ? post.user.username : 'Anonim'}</span>
                <span className="dot">•</span>
                <span className="date">Bugün</span> 
              </div>
              <div className="post-header">
                <h2 className="post-title">{post.title}</h2>
                {post.category && <span className="cat-badge">{post.category.name}</span>}
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-footer">
                <div className="post-tags">
                  {post.tags?.map(t => <span key={t.id} className="post-tag">#{t.name}</span>)}
                </div>
                <div className="post-actions">
                  {(user.role === 'admin' || (post.user && post.user.id === user.id)) && (
                    <button className="edit-btn" onClick={() => handleEditClick(post)} style={{marginRight: '10px', background:'none', border:'none', cursor:'pointer', color:'#4f46e5', fontWeight:'bold'}}>✏️ Düzenle</button>
                  )}
                  {user.role === 'admin' && (
                    <button className="delete-btn" onClick={() => handlePostSil(post.id)}>Sil</button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {posts.length === 0 && <div className="empty-state">Henüz hiç yazı paylaşılmamış.</div>}
        </div>
      </div>
    </div>
  );
}

export default App;