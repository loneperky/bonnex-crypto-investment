import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { SignUpRoute } from './Routes/auth/signUp'
import { LoginRoute } from './Routes/auth/logIn'
import { LogOutRoute } from './Routes/auth/logOut'
import { getAllTransxRoute } from './Routes/userDetails/getAllTransx'
import { addTransxRoute } from './Routes/userDetails/addTransx'
import { getTransxByTypeRoute } from './Routes/userDetails/getType'
import { profileRoute } from './Routes/userDetails/profile'
import { RefreshTokenRoute } from './Routes/auth/refreshToken'
import cookieParser from 'cookie-parser'
dotenv.config()


const app = express()

const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ["http://localhost:5173", "https://bonnex-crypto-investment.vercel.app"],
  credentials: true, // Allow cookies to be sent
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// Auth Route
app.use("/auth", SignUpRoute)
app.use("/auth", LoginRoute)
app.use("/auth", LogOutRoute)
app.use("/auth", RefreshTokenRoute)
// User Details Route
app.use("/transactions", getAllTransxRoute)
app.use("/transactions", addTransxRoute)
app.use("/transactions", getTransxByTypeRoute)
app.use("/user", profileRoute)

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`)
})