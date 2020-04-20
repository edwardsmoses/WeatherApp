import React, { Fragment, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function SearchInput({ placeholder, onSubmit }) {

    const [location, setLocation] = useState('');

    const handleSubmitEdit = () => {
        if (!location) return;

        onSubmit(location);
        setLocation('');
    }

    return (
        <Fragment>
            <TextInput
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                style={styles.textInput}
                onSubmitEditing={handleSubmitEdit}
                onChangeText={location => setLocation(location)}
                clearButtonMode="always"
            />
        </Fragment>
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#666',
        color: 'white',
        height: 50,
        paddingLeft: 15,
        width: 300,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignSelf: 'center'
    }
});
