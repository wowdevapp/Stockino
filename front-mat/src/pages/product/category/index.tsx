// ** React Imports
import {
    useState,
    useEffect,
    MouseEvent,
    useCallback,
    ReactElement,
    useMemo,
} from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// ** Icons Imports
import Laptop from "mdi-material-ui/Laptop";
import ChartDonut from "mdi-material-ui/ChartDonut";
import CogOutline from "mdi-material-ui/CogOutline";
import EyeOutline from "mdi-material-ui/EyeOutline";
import DotsVertical from "mdi-material-ui/DotsVertical";
import PencilOutline from "mdi-material-ui/PencilOutline";
import DeleteOutline from "mdi-material-ui/DeleteOutline";
import AccountOutline from "mdi-material-ui/AccountOutline";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Actions Imports
import { fetchData, deleteUser } from "src/store/apps/user";
import { fetchCategories } from "src/store/apps/product/category";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { ThemeColor } from "src/@core/layouts/types";
import { UsersType } from "src/types/apps/userTypes";
import { Category } from "../types";

// ** Custom Components Imports
import AddProductDrawer from "src/views/apps/products/AddProductDrawer";
import TableCategoryHeader from "src/components/product/category/TableCategoryHeader";
import { Pagination } from "@mui/material";



interface CategoryStatusType {
    [key: string]: ThemeColor;
}

interface CellType {
    row: Category;
}

const categoryStatusObj: CategoryStatusType = {
    active: "success",
    pending: "warning",
    inactive: "secondary",
};

// ** Styled component for the link for the avatar with image
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
    marginRight: theme.spacing(3),
}));

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    marginRight: theme.spacing(3),
}));

// ** Styled component for the link inside menu
const MenuItemLink = styled("a")(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: theme.spacing(1.5, 4),
    color: theme.palette.text.primary,
}));

const RowOptions = ({ id }: { id: number | string }) => {
    // ** Hooks
    const dispatch = useDispatch<AppDispatch>();

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const rowOptionsOpen = Boolean(anchorEl);

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleRowOptionsClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        dispatch(deleteUser(id));
        handleRowOptionsClose();
    };

    return (
        <>
            <IconButton size="small" onClick={handleRowOptionsClick}>
                <DotsVertical />
            </IconButton>
            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={rowOptionsOpen}
                onClose={handleRowOptionsClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                PaperProps={{ style: { minWidth: "8rem" } }}
            >
                <MenuItem sx={{ p: 0 }}>
                    <Link href={`/apps/user/view/${id}`} passHref>
                        <MenuItemLink>
                            <EyeOutline fontSize="small" sx={{ mr: 2 }} />
                            View
                        </MenuItemLink>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleRowOptionsClose}>
                    <PencilOutline fontSize="small" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <DeleteOutline fontSize="small" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

const columns = [
    {
        flex: 0.2,
        minWidth: 230,
        field: "category_name",
        headerName: "name",
        renderCell: ({ row }: CellType) => {
            const { category_name } = row;

            return (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* {renderClient(row)} */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        {category_name}
                    </Box>
                </Box>
            );
        },
    },
    {
        flex: 0.2,
        minWidth: 250,
        field: "category_slug",
        headerName: "Slug",
        renderCell: ({ row }: CellType) => {
            return (
                <Typography noWrap variant="body2">
                    {row.category_slug}
                </Typography>
            );
        },
    },
    {
        flex: 0.15,
        minWidth: 120,
        headerName: "Parent",
        field: "currentPlan",
        renderCell: ({ row }: CellType) => {
            const {parent} = row;
            return (
                <div>
                    {parent ? (
                        <Typography
                            variant="subtitle1"
                            noWrap
                            sx={{ textTransform: "capitalize" }}
                        >
                            {parent.category_name}
                        </Typography>
                    ) : (
                        <div>No parent</div>
                    )}
                </div>
            );
        },
    },
    {
        flex: 0.1,
        minWidth: 110,
        field: "status",
        headerName: "Status",
        renderCell: ({ row }: CellType) => {
            return (
                <CustomChip
                    skin="light"
                    size="small"
                    label={row.active ? "Active" : "Inactive"}
                    color={
                        row.active
                            ? categoryStatusObj["active"]
                            : categoryStatusObj["inactive"]
                    }
                    sx={{
                        textTransform: "capitalize",
                        "& .MuiChip-label": { lineHeight: "18px" },
                    }}
                />
            );
        },
    },
    {
        flex: 0.1,
        minWidth: 90,
        sortable: false,
        field: "actions",
        headerName: "Actions",
        renderCell: ({ row }: CellType) => <RowOptions id={row.id} />,
    },
];

const index = () => {
    // ** State
    const [value, setValue] = useState<string>("");
    //const [pageSize, setPageSize] = useState<number>(10);
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false);

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>();
    //const store = useSelector((state: RootState) => state.user)
    const { categories,total } = useSelector((state: RootState) => state.category);
    //const { pageInfo}    = useSelector(state: RootState) => state.category);

    

    const handleFilter = useCallback((val: string) => {
        setValue(val);
    }, []);

    const toggleAddProductDrawer = () => setAddUserOpen(!addUserOpen);

    //pagination
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
  
    const queryOptions = useMemo(
      () => ({
        page,
        pageSize,
      }),
      [page, pageSize],
    );
    useEffect(() => {
      dispatch(fetchCategories(queryOptions));
  },[page,pageSize]);
  
    //const { isLoading, data, pageInfo } = useQuery(queryOptions);
  
    // Some API clients return undefined while loading
    // Following lines are here to prevent `rowCountState` from being undefined during the loading
    const [rowCountState, setRowCountState] = useState(total || 0);

    useEffect(() => {
      setRowCountState((prevRowCountState) =>
        total !== undefined
          ? total
          : prevRowCountState,
      );
    }, [total, setRowCountState]);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        title="Search Filters"
                        sx={{
                            pb: 4,
                            "& .MuiCardHeader-title": {
                                letterSpacing: ".15px",
                            },
                        }}
                    />
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableCategoryHeader
                        value={value}
                        handleFilter={handleFilter}
                        toggle={toggleAddProductDrawer}
                    />
                    <DataGrid
                        autoHeight
                        rows={categories}
                        rowsPerPageOptions={[5]}
                        columns={columns}
                        checkboxSelection
                        pageSize={pageSize}
                        paginationMode="server"
                        rowCount={rowCountState}
                        pagination
                        page={page}
                        onPageChange={(newPage) =>  setPage(newPage)}
                        disableSelectionOnClick
                        sx={{
                            "& .MuiDataGrid-columnHeaders": { borderRadius: 0 },
                        }}
                        onPageSizeChange={(newPageSize: number) =>
                            setPageSize(newPageSize)
                        }
                    />
                </Card>
            </Grid>
        </Grid>
    );
};


export default index;
