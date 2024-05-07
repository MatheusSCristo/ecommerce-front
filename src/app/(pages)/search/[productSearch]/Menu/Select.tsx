import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

export default function SelectAutoWidth() {
  const [sortBy, setSortBy] = useState<string >("");


  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150}} >
        <InputLabel id="demo-simple-select-autowidth-label">Classificar por</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={sortBy}
          onChange={handleChange}
          autoWidth
          label="Classificar por"
        >
          <MenuItem value="" disabled>
            <em>Classificar por</em>
          </MenuItem>
          <MenuItem value={"priceASC"}>Preço:Do menor</MenuItem>
          <MenuItem value={"priceDSC"}>Preço:Do maior</MenuItem>
          <MenuItem value={"avaliation"}>Melhores avaliado</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}