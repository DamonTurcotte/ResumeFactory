import { Text } from './Themed';

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function DMText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'DMSans-Regular' }]} />;
}

export function DMMediumText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'DMSans-Medium' }]} />;
}

export function DMBoldText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'DMSans-Bold' }]} />;
}
