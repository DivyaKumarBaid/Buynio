"use client"
import { useMapperContext } from '../hooks/selectedElemContext';

const Settings = () => {
  const useMapper = useMapperContext();
  console.log(useMapper);
  return (
    <div>Settings</div>
  )
}

export default Settings