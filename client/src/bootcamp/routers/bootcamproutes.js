import { Route, Routes } from 'react-router-dom'
import Countdown from '../../hackathon/countdown/countdown'
import { BootcampNav } from '../bootcampnav/bootcampnav'
import { Home } from '../home/home'
import { LoginForm } from '../login/login'
import { RegistrationForm } from '../register/register'
import { HackStudentscore } from '../score/score'
import { OTPForm } from '../sendotp/sendotp'
import { UpdateForm } from '../update/update'
import { Tasks } from '../tasks/tasks'
import { Performance } from '../performance/performance'
import { Materials } from '../materials/materials'
export const BootcampRoutes = () => {
    return (
        <>
            <BootcampNav />
            <Routes>
                <Route path='/register' element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/update" element={<OTPForm />} />
                <Route path='/updateform' element={<UpdateForm/>}/>
                <Route path='/tasks' element={<Tasks/>}/>
                <Route path='/performance' element={<Performance/>}/>
                <Route path='/materials' element={<Materials/>}/>
                <Route path="/score" element={<HackStudentscore />} />
                <Route path="/" element={<Countdown />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </>
    )
}