import {NavigationContainer} from "@react-navigation/native"

import {BottomRoutes} from "./BottomRoutes";
import {StackRoutes} from "./StackRoutes";

const NAVEGACAO = "bottom"

export function Routes() {
    return(
        <NavigationContainer>
            {/* {NAVEGACAO === 'stack' && <StackRoutes/>} */}
            {NAVEGACAO === 'bottom' && <BottomRoutes/>}
        </NavigationContainer>
    )
}