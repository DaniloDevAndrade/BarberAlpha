import { Users } from "@prisma/client";

export const rowTimeJoin = (user: Users) => {
    const joinRowAt = new Date(user.joinRowAt as Date);
    const now = new Date();

    // Verifica se a data de entrada é válida e não está no futuro
    if (isNaN(joinRowAt.getTime()) || joinRowAt > now) {
        return 'Data inválida'; // ou 'Ainda não entrou', dependendo do contexto
    }

    const diff = now.getTime() - joinRowAt.getTime();
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return `${hours}hrs e ${minutes}min`;
}
