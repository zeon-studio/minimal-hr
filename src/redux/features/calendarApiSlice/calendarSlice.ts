import { apiSlice } from "../apiSlice/apiSlice";
import { TAllCalendarEvents, TCalendar, TCalendarState } from "./calendarType";

const calendarApiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["calendars"],
});

export const calendarApi = calendarApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getCalendars: builder.query<TCalendarState, number>({
      query: (year) => ({
        url: `/calendar/${year}`,
        method: "GET",
      }),
      providesTags: ["calendars"],
      keepUnusedDataFor: 30 * 60,
    }),

    getCalendar: builder.query<TCalendarState<TCalendar>, string>({
      query: (id) => ({
        url: `/calendar/${id}`,
        method: "GET",
      }),
      providesTags: ["calendars"],
    }),

    getUpcomingHolidaysAndEvents: builder.query<TAllCalendarEvents, string>({
      query: (date) => ({
        url: `/calendar/upcoming?current_date=${date}`,
        method: "GET",
      }),
      providesTags: ["calendars"],
    }),

    addCalendar: builder.mutation<TCalendarState, TCalendar>({
      query: (data) => ({
        url: `/calendar`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["calendars"],
    }),

    updateCalendar: builder.mutation({
      query: (data) => {
        return {
          url: `/calendar/${data.year}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["calendars"],
    }),

    deleteCalendar: builder.mutation({
      query: (id) => ({
        url: `/calendar/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["calendars"],
    }),
  }),
});

export const {
  useGetCalendarsQuery,
  useGetCalendarQuery,
  useGetUpcomingHolidaysAndEventsQuery,
  useAddCalendarMutation,
  useUpdateCalendarMutation,
  useDeleteCalendarMutation,
} = calendarApi;
