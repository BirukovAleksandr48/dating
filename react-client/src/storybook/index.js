import React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from '../components/Calendar/Calendar';
import Home from '../pages/Home/Home';

storiesOf('React', module)
    .add('Calendar', () => (
        <Calendar/>
    ));
