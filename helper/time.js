const reservationTimes = [
    "1:30:00 AM",
    "5:30:00 AM",
    "9:30:00 AM",
    "1:30:00 PM",
    "7:30:00 PM",
    "11:30:00 PM",
  ];
  

export function getReservationTime(currentDate) {
  function combineDateWithTimes(currentDate) {
    const formattedDate  = currentDate.toLocaleDateString();
    return reservationTimes.map((time) => `${formattedDate}, ${time}`);
  }

  const reservationDateTimes  = combineDateWithTimes(currentDate);  

  function filterUpcomingTimes(reservationDateTimes) {
    const now = new Date();
    const currentDateTime = now.toLocaleString();

    return reservationDateTimes.filter((dateTime) => {
      const reservationDateTime = new Date(dateTime);
      const currentDateTimeObj = new Date(currentDateTime);
      return reservationDateTime > currentDateTimeObj;
    });
    
  }

  const upcomingReservationDateTimes  = filterUpcomingTimes(reservationDateTimes);

  return upcomingReservationDateTimes .map((dateTime)=>dateTime.split(", ")[1]);
}
