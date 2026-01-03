export class CreatePostDto {
  title: string;
  content: string;
  userId: number;       // Bunu ekledik, artık userId'yi tanıyacak
  categoryId: number;   // Bunu ekledik, categoryId'yi tanıyacak
  tagIds?: number[];    // Bunu ekledik, etiketleri tanıyacak
}