import { TextField, 
    Frame
} from "@shopify/polaris";
import Nav from './Nav'
const Layout = ({children}) => {
    return (
        <Frame>
            <Nav/>
            {children}
        </Frame>
    );
}
export default Layout