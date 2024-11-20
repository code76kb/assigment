import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { normalize } from '../utils';
import { RadioGroup, RadioGroupProps } from 'react-native-radio-buttons-group';

type Props = {
  selectedType: string;
  onChange: (type: string) => void;
  testID?: string;
};

const FilterComponent: React.FC<Props> = ({ selectedType, onChange, testID }) => {
  const [selectedId, setSelectedId] = React.useState('1');

  const radioButtons: RadioGroupProps[] = useMemo(
    () => [
      {
        id: '1',
        label: 'Admin',
        value: 'ADMIN',
        color: selectedId === '1' ? colors.primary : colors.border,
        labelStyle: styles.labelStyle,
      },
      {
        id: '2',
        label: 'Manager',
        value: 'MANAGER',
        color: selectedId === '2' ? colors.primary : colors.border,
        labelStyle: styles.labelStyle,
      },
    ],
    [selectedId],
  );

  useEffect(() => {
    if (selectedId) {
      const selectedType = radioButtons.find(item => item.id === selectedId)?.value;
      onChange(selectedType || '');
    }
  }, [selectedId]);

  return (
    <View testID={testID} style={styles.container}>
      <Text style={styles.headerText}>{"User Types"}</Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
        containerStyle={styles.radioGroupContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerText: {
    color: colors.text,
    fontSize: normalize(22),
    fontWeight: '500',
  },
  radioGroupContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
  labelStyle: {
    color: colors.text,
    fontWeight: '500',
  },
});


export default FilterComponent;
