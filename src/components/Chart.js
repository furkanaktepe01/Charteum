import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = ({ data, dataKey, color }) => {

    return (
          <BarChart            
            width={800}
            height={500}
            data={ data } 
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="block" />
            <YAxis/>
            <Tooltip />
            <Legend />
            <Bar dataKey={ dataKey } fill={ color } />
          </BarChart>
      );
}

export default Chart;