import type { User } from "../types"

export const fetchUsers = async (page: number, perPage = 10, seed = 'reactquery') => {
  const response = await fetch(`https://randomuser.me/api/?page=${page}&results=${perPage}&seed=${seed}`)
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  const data = await response.json()
  const mappedUsers: User[] = data.results.map((user: any) => ({
    id: user.login.uuid,
    fullname: `${user.name.first} ${user.name.last}`,
    username: user.login.username,
    email: user.email,
    image: user.picture.thumbnail,
    coutry: user.location.country,
  }))
  return mappedUsers
}