export interface Student {
    isActive?: boolean; // Активность студента (пока опционально)
    id: number; // Айдишка
    name: string;  // Имя
    secondname: string; // Отчество
    lastname: string; // Фамилия
    role_id: number; // Роль
    group_id: number; // Группа
    institute_id: number; // Институт
    code: string; // Код студента
    phone: string; // Телефон
    mail: string; // Почта
    photo?: string; // Фото
    course?: number;
}
