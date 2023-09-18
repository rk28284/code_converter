import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../Page/Dashboard"
import { CodeConverter} from "../Page/CodeConvt"

export const Allroutes=()=>{
    return <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/converter" element={<CodeConverter/>}/>
        
    </Routes>
}
