import "./addUser.css";

const AddUser = () => {
  return (
    <div className="addUser">
      <form>
        <input type="text" placeholder="username" name="username" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detail">
          <img src="./avatar.png" alt="Avatar" />
          <span>Jimmy Olise</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
};

export default AddUser;