import { CircularProgress } from "@mui/material"

const loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress/>
    </div>
  )
}

export default loading