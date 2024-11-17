export interface Student {
    isActive?: boolean; // Активность студента (пока опционально)
    id: number; // Айдишка
    fullName: string; // ФИО
    institute: string; // Институт
    course: number; // Курс
    group: string; // Группа
    photo: string; // Фото
}