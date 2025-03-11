import { Box } from "@mui/material";
import { motion } from "framer-motion";

type SpinnerProps = {
  isLoading: boolean;
};

const NUMBER_OF_DOTS = 3
const DOT_SIZE = 12

const dotVariants = {
  animate: (i: number) => ({
    scale: [1, 1.5, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.8,
    },
  }),
};

const Spinner = ({ isLoading }: SpinnerProps) => {
  if (!isLoading) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", flex: 1, my: 4 }}>
      {[...Array(NUMBER_OF_DOTS)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={dotVariants}
          animate="animate"
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
						margin: DOT_SIZE / 3,
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        />
      ))}
    </Box>
  );
};

export default Spinner;