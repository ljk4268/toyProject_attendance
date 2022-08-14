import { postPlaces, getPlaces } from '../module/places'


// 장소등록 input창
import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';


function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return 'This field is being focused';
    }

    return '정모인 경우 체크박스를 클릭해주세요.';
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

function PlaceInput(props){

  return(
    <Box component="form" noValidate autoComplete="off"
      sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', }}
    >
      <FormControl sx={{ width: '80vw'}}>
        <OutlinedInput placeholder="모임 장소를 입력해주세요." id="places"/>
      </FormControl>

      {/* 장소등록 버튼 누르면 서버에 장소등록API 보내기 */}
      <Button 
        variant="outlined" 
        onClick={
          async ()=>{
            await postPlaces(props.date);
            await getPlaces(props.setTodayPlaces, props.date);
            document.getElementById("places").value = null;
          }
        }>등록</Button>
    </Box>
  )
}

export default PlaceInput;