import { useState } from "react"

function useElevator(position) {
    const [currentFloor, setCurrentFloor] = useState(position);
    const [moveDirection, setMoveDirection] = useState(null);

    const moveElevator = async (destination) => {
        const moveDirection = destination > currentFloor ? "up" : "down";
        setMoveDirection(moveDirection);
        switch (moveDirection) {
            case "up":
                for (
                    let i = currentFloor;
                    i <= destination;
                    i++
                ) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setCurrentFloor(i);
                }
                break;
            case "down":
                for (
                    let i = currentFloor;
                    i >= destination;
                    i--
                ) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setCurrentFloor(i);
                }
                break;
        }
        setMoveDirection(null);
    }

    return { currentFloor, moveDirection, moveElevator };
}

export default useElevator;