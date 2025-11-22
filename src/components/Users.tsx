import { useEffect, useState } from "react"
import type { User } from "../types"
import { SpinnerIcon } from "./icons/spinner"
import { UserItem } from "./UserItem"

export const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const perPage = 10
  const seed = "reactquery"

  const fetchUsers = async () => {
      setLoading(true)
      setError(false)
      try {
        const response = await fetch(`https://randomuser.me/api/?page=${page}&results=${perPage}&seed=${seed}`)
        const data = await response.json()
        const mappedUsers: User[] = data.results.map((user: any) => ({
          id: user.login.uuid,
          fullname: `${user.name.first} ${user.name.last}`,
          username: user.login.username,
          email: user.email,
          image: user.picture.thumbnail,
          coutry: user.location.country,
        }))
        setUsers(mappedUsers)
      } catch (error) {
        setError(true)
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

  const handlePaginationPrev = () => {
    setPage(prev => Math.max(prev - 1, 1))
  }
  const handlePaginationNext = () => {
    setPage(prev => prev + 1)
  }
  
  useEffect(() => {
    fetchUsers()
  }, [page])


  return (
    <div className="flex flex-col gap-2">
      {loading && <SpinnerIcon width="40" height="40" />}
      {error && <p>Error!!!</p>}
      {/* {!loading && !error && users.length === 0 && <p>No users found.</p>} */}

      {(users.length > 0 && !loading) &&
        <div className="w-[400px]">
          <div className="flex flex-col items-center gap-2 mx-auto">
            {users.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-10">
            <button className="pagination-btn" onClick={handlePaginationPrev}>Prev</button>
            <button className="pagination-btn" onClick={handlePaginationNext}>Next</button>
          </div>
        </div>
      }
      
    </div>
  )
}