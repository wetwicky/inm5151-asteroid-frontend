
let Game = ({onDisconnect, sendHello}) => {
    return (
        <div>
            <h1>Game here</h1>
            <button onClick={e => {
                sendHello()
            }}>
                Send hello
            </button>
            <button onClick={e => {
                onDisconnect()
            }}>
                Disconnect
            </button>
        </div>
    )
}
