import SideBar from "./SideBar";

export default function DashBoard({ id }) {
    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <SideBar id={id} />
        </div>
    )
}
