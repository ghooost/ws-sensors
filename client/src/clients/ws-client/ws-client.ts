export type MessageData = string;

export enum CloseCode {
  ClosedByClient = 4001,
  Error = 4002,
  ClosedByServer = 1000,
  Abnormal = 1006,
}

const closedByClient = {
  code: CloseCode.ClosedByClient,
  reason: "Closed by client",
};

interface Options {
  onOpen?: () => void;
  onMessage?: (data: MessageData) => void;
  onClose?: (code: CloseCode, reason: string) => void;
}

const defFn = () => {
  //
};

export function wsClient(url: string, { onOpen, onMessage, onClose }: Options) {
  let socket: WebSocket | null = null;

  connect();

  function connect() {
    socket = new WebSocket(url);
    socket.onopen = () => {
      if (socket) onOpen?.();
    };
    socket.onmessage = ({ data }: { data: MessageData }) => {
      if (data?.length && socket) onMessage?.(data);
    };
    socket.onclose = (e: CloseEvent) => {
      const { code, reason } = !socket ? closedByClient : e;
      onClose?.(code as CloseCode, reason);
      close();
    };
    socket.onerror = (e) => {
      setTimeout(() => {
        (e.currentTarget as WebSocket)?.close(
          CloseCode.Error,
          "Timeout"
        );
      }, 300);
    };
  }

  function close() {
    if (socket) {
      const _socket = socket;
      socket = null;
      _socket.onopen = defFn;
      _socket.onmessage = defFn;
      _socket.onerror = defFn;
      _socket.close(closedByClient.code, closedByClient.reason);
    }
  }

  return {
    get status(): "open" | "closed" | "busy" {
      if (!socket) return "closed";
      if (socket && socket.readyState === socket.OPEN) return "open";
      return "busy";
    },
    send(data: string) {
      if (socket && socket.readyState === socket.OPEN) socket.send(data);
    },
    close,
  };
}

export type WsClient = ReturnType<typeof wsClient>;
