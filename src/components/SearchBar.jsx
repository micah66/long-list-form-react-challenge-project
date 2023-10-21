import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const StyledSearchBar = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',

  '& .search-icon': {
    marginRight: '-30px',
    zIndex: 1,
  },

  '& .input input': {
    paddingLeft: '36px',
  },
}));

export default function SearchBar({ inputComponent }) {
  return (
    <StyledSearchBar>
      <SearchIcon className="search-icon" />
      <Box className="input">{inputComponent}</Box>
    </StyledSearchBar>
  );
}
