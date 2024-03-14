import React, { useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetFooter
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_services/GlobalApi';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import moment from 'moment/moment';

const BookingSection = ({ children, buisness }) => {

    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const { data } = useSession();
    const[bookedSlot,setBookedSlot]=useState([]);

    useEffect(() => {
        getTime();
    }, []);

    useEffect(()=>{
        date&&BuisnessBookedSlot();
    },[date])


    const BuisnessBookedSlot=()=>{
        GlobalApi.getBuisnessBookedSlot(buisness.id,moment(date).format('DD-MMM-yyyy'))
        .then(resp=>{
            console.log(resp);
            setBookedSlot(resp.bookings)
        })
    }

    const getTime = () => {
        const timeList = [];
        for (let i = 10; i <= 12; i++) {
            timeList.push({
                time: i + ':00 AM',
                selected: false
            });
            timeList.push({
                time: i + ':30 AM',
                selected: false
            });
        }
        for (let i = 1; i <= 6; i++) {
            timeList.push({
                time: i + ':00 PM',
                selected: false
            });
            timeList.push({
                time: i + ':30 PM',
                selected: false
            });
        }
        setTimeSlot(timeList);
    };

    const handleTimeSelection = (time) => {
        const updatedTimeSlot = timeSlot.map(slot => ({
            ...slot,
            selected: slot.time === time
        }));
        setTimeSlot(updatedTimeSlot);
        setSelectedTime(time);
    };


    const isSlotBooked=(time)=>{
        return bookedSlot.find(item=>item.time==time)
    }
    const saveBooking = () => {
        GlobalApi.createNewBooking(buisness.id, moment(date).format('DD-MMM-yyyy'), selectedTime, data.user.email, data.user.name)
            .then(resp => {
                console.log(resp)
                if (resp) {

                    setDate();
                    setSelectedTime();
                    toast("Service Booked Successsully!")
                }
            }, (e) => {
                toast('Error While Creating Booking')
            })
    }
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent className='overflow-auto'>
                    <SheetHeader>
                        <SheetTitle>Book a Service</SheetTitle>
                        <SheetDescription>
                            Select Date and Time slot to book a service
                            {/* Date Picker */}
                            <div className='flex flex-col gap-5 items-baseline'>
                                <h2 className='my-5 font-bold'> Select Date</h2>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                />
                            </div>
                            {/* Time Slot Picker */}
                            <h2 className='my-5 font-bold'>Select Time Slot</h2>
                            <div className='grid grid-cols-3 gap-3'>
                                {timeSlot.map((item, index) => (
                                    <Button
                                        key={index}
                                        disabled={isSlotBooked(item.time)}
                                        variant='outline'
                                        className={`border rounded-full hover:bg-primary p-2 px-3 hover:text-white ${item.selected ? 'bg-primary text-white' : ''}`}
                                        onClick={() => handleTimeSelection(item.time)}
                                    >
                                        {item.time}
                                    </Button>
                                ))}
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                    <SheetFooter className='mt-5'>
                        <SheetClose asChild>
                            <div className='flex gap-5'>
                                <Button disabled={!(selectedTime && date)}
                                    onClick={() => saveBooking()}

                                >Book</Button>
                                <Button variant='destructive' className=''>Cancel</Button>
                            </div>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default BookingSection;
