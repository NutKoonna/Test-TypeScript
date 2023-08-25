function getClockAngle(hh_mm: string): number {
  const [hourStr, minuteStr]: string[] = hh_mm.split(':');
  const hour: number = parseInt(hourStr);
  const minute: number = parseInt(minuteStr);
  const hourAngle: number = ((hour % 12) * 30) + (minute * 0.5) ;
  const minuteAngle: number = minute * 6;
  let angle: number = Math.abs(hourAngle - minuteAngle);

  if (angle > 180) {
    angle = 360 - angle;
  }
  return angle;
}
console.log(getClockAngle("09:00")); // Output: 90
console.log(getClockAngle("17:30")); // Output: 15
