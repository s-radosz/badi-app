import React, {useState, useEffect, useCallback} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import PageHeader from './PageHeader';
import ButtonComponent from './../Utils/ButtonComponent';
import lang from './../../lang/SharedComponents/FilterModal';
import {useSelector} from 'react-redux';

interface FilterModalProps {
    filterModalName: string;
    filterOptions: any;
    closeFilter: any;
    filterResults: any;
}

const FilterModal = ({
    filterModalName,
    filterOptions,
    closeFilter,
    filterResults,
}: FilterModalProps) => {
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    const [userSelectData, setUserSelectData] = useState(false);
    const [selectedResultName, setSelectedResultName] = useState('');
    const [selectedResultValue, setSelectedResultValue] = useState('');
    const [selectedResultId, setSelectedResultId] = useState(0);
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        //console.log(filterOptions);

        if (filterModalName === lang.distance[activeLanguage]) {
            setSelectedData(filterOptions.distance);
            setSelectedResultName(lang.distance[activeLanguage]);
        } else if (filterModalName === lang.hobby[activeLanguage]) {
            setSelectedData(filterOptions.hobby);
            setSelectedResultName(lang.hobby[activeLanguage]);
        } else if (filterModalName === lang.status[activeLanguage]) {
            setSelectedData(filterOptions.status);
            setSelectedResultName(lang.status[activeLanguage]);
        }
    }, []);

    const setSelectedResult = useCallback(
        (selectedResultValue: string, index: number) => {
            setSelectedResultValue(selectedResultValue);
            setSelectedResultId(index);
            setUserSelectData(true);
        },
        [selectedResultValue, selectedResultId],
    );

    return (
        <ScrollView>
            <PageHeader
                boldText={lang.filterResults[activeLanguage]}
                normalText={`${filterModalName} - ${selectedResultValue}`}
                closeMethod={closeFilter}
                closeMethodParameter={''}
            />

            <View style={styles.filterModalContainer}>
                <View style={styles.filterModalOptionContainer}>
                    {selectedData &&
                        selectedData.map((option: any, i: number) => {
                            return (
                                <TouchableOpacity
                                    style={
                                        selectedResultId === i && userSelectData
                                            ? styles.filterModalOptionActive
                                            : styles.filterModalOptionInactive
                                    }
                                    key={`FilterModal-${i}`}
                                    onPress={() =>
                                        setSelectedResult(option.text, i)
                                    }>
                                    <Text>{option.text}</Text>
                                </TouchableOpacity>
                            );
                        })}
                </View>
            </View>

            <ButtonComponent
                pressButtonComponent={() =>
                    filterResults(selectedResultName, selectedResultValue)
                }
                buttonComponentText={lang.filterResults[activeLanguage]}
                fullWidth={true}
                underlayColor="#dd904d"
                whiteBg={false}
                showBackIcon={false}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    filterModalContainer: {paddingLeft: 10, paddingRight: 10},
    filterModalHeaderTextContainer: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 16,
        paddingLeft: 10,
        paddingRight: 10,
    },
    filterModalHeaderTextBold: {
        fontWeight: '600',
        color: '#424242',
        //fontFamily: "Open Sans"
    },
    filterModalOptionContainer: {paddingTop: 30},
    filterModalOptionActive: {
        borderRadius: 6,
        borderWidth: 1,
        marginBottom: 5,
        padding: 10,
        borderColor: 'orange',
    },
    filterModalOptionInactive: {
        borderRadius: 6,
        borderWidth: 1,
        marginBottom: 5,
        padding: 10,
        borderColor: '#424242',
    },
    activeFiltersConatiner: {
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        marginTop: 5,
        marginBottom: 10,
    },
});

export default FilterModal;
