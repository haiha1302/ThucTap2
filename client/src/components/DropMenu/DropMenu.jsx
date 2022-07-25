import DropdownItem from "./DropdownItem";

const titleModal = {
    userTrue: [
        {id: 1, path: '/profile', title: 'Thông tin tài khoản'},
        {id: 2, path: '/create-post', title: 'Đăng bài viết'},
        {id: 3, path: '/list-posts', title: 'Danh sách bài viết'},
        {id: 4, path: '/', title: 'Đăng xuất tài khoản'}
    ],
    userFalse: [
        {id: 1, path: '/login', title: 'Đăng nhập tài khoản'},
        {id: 2, path: '/register', title: 'Tạo tài khoản mới'}
    ]
}

const DropMenu = (props) => {
    return (
        <div className="modal-user" >
            {
                props.isAuth === true ?
                <>
                    {
                        titleModal.userTrue.map(data => <DropdownItem key={data.id} path={data.path} title={data.title}/>)
                    }
                </>
                :
                <>
                    {
                        titleModal.userFalse.map(data => <DropdownItem key={data.id} path={data.path} title={data.title} />)
                    }
                </>
            }
        </div>
    )
};

export default DropMenu;
