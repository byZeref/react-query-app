import type { User } from "../types"

type Props = {
  user: User
}

export const UserItem = ({user}: Props) => {
  return (
    <div className="flex items-center gap-2 h-12">
      <div className="size-10 rounded-full overflow-hidden">
        <img src={user.image} alt="user image" className="size-10" />
      </div>
      <h4 className="w-[140px]">{user.fullname}</h4>
    </div>
  )
}