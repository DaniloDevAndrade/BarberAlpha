import { Costs, Users } from "@prisma/client";

  export function calculateNewUserPercentage(users: Users[]): number {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const newUsers = users.filter(user => new Date(user.createdAt) >= oneMonthAgo);
    return (newUsers.length / users.length) * 100;
  }
  export function calculateNewUserMonth(users: Users[]): number {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const newUsers = users.filter(user => new Date(user.createdAt) >= oneMonthAgo);
    return newUsers.length;
  }
  
  export function paginateUsers(users: Users[], page: number, pageSize: number): Users[] {
    const startIndex = (page - 1) * pageSize;
    return (Array.isArray(users) ? users : []).slice(startIndex, startIndex + pageSize);
  }

  export function paginateCosts(costs: Costs[], page: number, pageSize: number): Costs[] {
    const startIndex = (page - 1) * pageSize;
    return (Array.isArray(costs) ? costs : []).slice(startIndex, startIndex + pageSize);
  }
  
  