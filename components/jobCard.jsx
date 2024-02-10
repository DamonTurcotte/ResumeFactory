import React from 'react';
import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';

export const JobCard = ({ job, style, children }) => {
  return (
  <Card mode='outlined' style={style}>
    <Card.Content>
      <Text variant='headlineSmall'>{job.Title}</Text>
      <Text variant='bodyLarge'>{job.Company}</Text>
      <Text variant='bodyLarge'>{job.Location}</Text>
      <Text variant='bodyLarge'>{job.Start} {job.Start.length > 0 && job.End.length > 0 && '-'} {job.End}</Text>
      { job.Duties.map((duty, index) => (
        <View key={index} style={{flexDirection: 'row'}}>
          <View>
            <Text variant='bodySmall'>• </Text>
          </View>
          <Text variant='bodySmall'>{duty}</Text>
        </View>
      ))}
    </Card.Content>
    <Card.Actions>
      {children}
    </Card.Actions>
  </Card>
)}