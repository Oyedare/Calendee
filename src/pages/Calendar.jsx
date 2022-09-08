import React from 'react'
import { ScheduleComponent,ViewsDirective,ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop} from '@syncfusion/ej2-react-schedule';
// import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
// import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { useState } from 'react';
// import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data'
import {  L10n } from '@syncfusion/ej2-base';

L10n.load({
  'en-US':{
    'schedule': {
      'saveButton': 'Add',
      'cancelButton': 'Close',
      'deleteButton': 'Remove',
      'newEvent': 'New Event',
    },
  }
})
export const Calendar = () => {
    const scheduleData = [
        {
          Subject: 'Happy Birthday Temi',
          Location: 'Nigeria',
          StartTime: new Date(2022,1,20,12,0),
          EndTime: new Date(2022,1,20,23,30),
          IsAllDay: true,
          RecurrenceRule: 'FREQ=YEARLY; BYMONTHDAY=20; BYMONTH=2; INTERVAL=1',
          IsReadonly: true
        },
        {
          Subject: 'New Week! New Energy!',
          Location: 'Nigeria',
          StartTime: new Date(2022,7,15,12,0),
          EndTime: new Date(2022,7,15,23,30),
          IsAllDay: true,
          RecurrenceRule: 'FREQ=WEEKLY; INTERVAL=1; BYDAY=MO, WE, FR',
          IsReadonly: true,
          allowVirtualScrolling: true
        },
    ];
    
    const [scheduleObj, setSecheduleObj] = useState()
    console.log(scheduleObj);
  return (
    <div className='bg-white w-full overflow-auto'>
      <div className='md:bg-[#F5F5F5] m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl'>
        <ScheduleComponent
          height="700px"
          eventSettings={{dataSource: scheduleData}}
          enableAdaptiveUI={true}
          currentView='Month'
          ref={(schedule) => setSecheduleObj(schedule)}
          >
          <ViewsDirective>
            { ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
          </ViewsDirective>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
        </ScheduleComponent>
      </div>
    </div>
  )
}
