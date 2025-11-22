import { useEffect, useState } from "react"
import type { User } from "../types"
import { SpinnerIcon } from "./icons/spinner"
import { UserItem } from "./UserItem"
import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../services/users"

export const Users = () => {
  const [page, setPage] = useState(1)

  const { isLoading, isError, data: users = [], refetch, isRefetching } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetchUsers(page),
  })

  const handlePaginationPrev = () => {
    setPage(prev => Math.max(prev - 1, 1))
  }
  const handlePaginationNext = () => {
    setPage(prev => prev + 1)
  }
  
  useEffect(() => {
    refetch()
  }, [page])

  return (
    <div className="flex flex-col gap-2">
      {isLoading && <SpinnerIcon width="40" height="40" />}
      {isError && <p>Error!!!</p>}
      {/* {!isLoading && !isError && users.length === 0 && <p>No users found.</p>} */}

      {(users.length > 0 && !isLoading) &&
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

      {/* debug */}
      <div className="absolute bottom-0 right-0 bg-red-400 min-w-40 h-10 content-center">
        <p className="text-black text-center">{isRefetching ? 'refetching' : 'done'}</p>
      </div>
      {/* debug */}
    </div>
  )
}