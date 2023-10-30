import { motion, useAnimation } from "framer-motion";

export function ShakeDaBox({}:any){
    const controls = useAnimation();
    return(<>
        <motion.div
            whileHover={{
                rotateZ: [0, -20, 20, -20, 20, -20, 20, 0],
                transition: { duration: 1 },
              }}>
        <button onClick={()=>controls.start("start")}>Shake Me!</button>
        </motion.div>
    </>)
}