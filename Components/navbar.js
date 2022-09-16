import  React from 'react-native';
import {Appbar} from 'react-native-paper';
import styles from './styles';

const Header = () => {
    return (
        <Appbar.Header style={{marginTop:10, borderRadius:10,...styles.container }}>
            <Appbar.Content title='Daily News'/>
        </Appbar.Header>
    )
}

export default Header;