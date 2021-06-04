import React from 'react';
import {Grid, Select,MenuItem,InputLabel} from '@material-ui/core';
import {Controller, useFormContext} from 'react-hook-form';

const SelectInput = ({name,label,value,change,selections}) => {

    const {control} = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <InputLabel>{label}</InputLabel>
            <Controller
            name={name}
            render={({ field }) => (
                <Select
                  {...field}
                    value={value}
                    onChange={change}
                    fullWidth
                >
                    {selections && selections.map((item)=>(
                        <MenuItem key={item.id} value={item.id}>
                        {item.name}
                    </MenuItem>
                    ))}
                </Select>
              )}
              control={control}
              defaultValue=''            
            />                
        </Grid>
    )
}

export default SelectInput

