import { useState } from "react";
import useElevator from "../hooks/useElevator"
import Elevator from "./Elevator";
import Floor from "./Floor";

import {
    Button, Icon,
} from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css";

const Block = () => {
    const [destination, setDestination] = useState(null);
    const [amIInsideElevator, setAmIInsideElevator] = useState(false);
    const [movingElevator, setMovingElevator] = useState(null);
    const { currentFloor: firstElevatorFloor, moveDirection: firstElevatorMoveDirection, moveElevator: firstElevatorMove } = useElevator(0);
    const { currentFloor: secondElevatorFloor, moveDirection: secondElevatorMoveDirection, moveElevator: secondElevatorMove } = useElevator(6);

    const selectElevator = async (destinationFloor) => {
        const diff1 = Math.abs(firstElevatorFloor - destinationFloor);
        const diff2 = Math.abs(secondElevatorFloor - destinationFloor);

        if (diff1 < diff2) {
            setMovingElevator("first");
            await firstElevatorMove(destinationFloor);
        } else if (diff2 < diff1) {
            setMovingElevator("second");
            await secondElevatorMove(destinationFloor);
        } else {
            if (firstElevatorFloor < secondElevatorFloor) {
                setMovingElevator("first");
                await firstElevatorMove(destinationFloor);
            } else {
                setMovingElevator("second");
                await secondElevatorMove(destinationFloor);
            }
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAmIInsideElevator(true);
    }

    const callElevator = async (destinationFloor) => {
        if (destination) {
            console.log("A destination is already selected");
            return;
        }
        setDestination(destinationFloor);
        await selectElevator(destinationFloor);
    }

    const moveElevatorToDestination = async (destinationFloor) => {
        setDestination(destinationFloor);
        if (movingElevator === "first") {
            await firstElevatorMove(destinationFloor);
        } else {
            await secondElevatorMove(destinationFloor);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setDestination(null);
        setMovingElevator(null);
        setAmIInsideElevator(false);
    }

    const selectElevatorButtonColor = (buttonNumber) => {
        if (buttonNumber === destination) {
            return "blue";
        }
        const movingElevatorPosition = movingElevator === "first" ? firstElevatorFloor : secondElevatorFloor;
        if (buttonNumber === movingElevatorPosition) {
            return "purple";
        }

        return null;
    }

    const displayElevatorPosition = (elevator) => {
        switch (elevator) {
            case "first":
                if (firstElevatorMoveDirection === "up") {
                    return "arrow up";
                } else if (firstElevatorMoveDirection === "down") {
                    return "arrow down";
                }
                break;
            case "second":
                if (secondElevatorMoveDirection === "up") {
                    return "arrow up";
                } else if (secondElevatorMoveDirection === "down") {
                    return "arrow down";
                }
                break;
        }

        return "stop";
    }

    return (<>
        <Elevator position={firstElevatorFloor} elevatorName={"A"} />
        <Elevator position={secondElevatorFloor} elevatorName={"B"} /> <br />

        {[6, 5, 4, 3, 2, 1, 0].map((floorNumber) => (
            <div key={floorNumber} style={{ display: 'flex', alignItems: 'center' }}>
                <Floor floorNumber={floorNumber} callElevator={() => callElevator(floorNumber)} />
                <Icon name={displayElevatorPosition("first")} />
                <Icon name={displayElevatorPosition("second")} />
                <br />
            </div>
        ))}

        {amIInsideElevator && [0, 1, 2, 3, 4, 5, 6].map((floorNumber) => (
            <Button key={floorNumber} color={selectElevatorButtonColor(floorNumber)} onClick={() => moveElevatorToDestination(floorNumber)}>
                {floorNumber}
            </Button>
        ))}
    </>)

}

export default Block;
