import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
    Dispatch,
    SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";

import api from "../services/api";

export interface IPost {
    _id: string;
    name: string;
    size: number;
    key: string;
    url: string;
}

export interface IFile {
    id: string;
    name: string;
    readableSize: string;
    uploaded?: boolean;
    preview: string;
    file: File | null;
    progress?: number;
    error?: boolean;
    url: string;
}

interface IFileContextData {
    uploadedFiles: IFile[];
    deleteFile(id: string): void;
    handleUpload(file: any): void;
    pdfShow: boolean;
    setPdfShow: Dispatch<SetStateAction<boolean>>;
    item: string;
    setItem: Dispatch<SetStateAction<string>>;
    showConfirmDelete: boolean;
    setShowConfirmDelete: Dispatch<SetStateAction<boolean>>;
    itemDeleteName: string;
    setItemDeleteName: Dispatch<SetStateAction<string>>;
    itemDeleteId: string;
    setItemDeleteId: Dispatch<SetStateAction<string>>;
    handlePdfShow: (i: any) => void;
    handleShowConfirmDelete: () => void;
    notConfirmeDelete: () => void;
    confirmDelete: (id: string, name: string) => void
}

export interface IChildren{
    children: React.ReactNode
}

const FileContext = createContext<IFileContextData>({} as IFileContextData);

const FileProvider: React.FC<IChildren> = ({ children }) => {
    const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
    const [pdfShow, setPdfShow] = useState(false)
    const [item, setItem] = useState("")
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [itemDeleteName, setItemDeleteName] = useState("")
    const [itemDeleteId, setItemDeleteId] = useState("")

    useEffect(() => {
        api.get<IPost[]>("posts").then((response) => {
            const postFormatted: IFile[] = response.data.map((post) => {
                return {
                    ...post,
                    id: post._id,
                    preview: post.url,
                    readableSize: filesize(post.size),
                    file: null,
                    error: false,
                    uploaded: true,
                };
            });

            postFormatted.sort(function(x, y) {
                let a = x.name.toUpperCase(),
                b = y.name.toUpperCase();

                return a === b ? 0 : a > b ? 1 : -1
            })
            
            setUploadedFiles(postFormatted);
        });
    }, []);

    useEffect(() => {
        return () => {
            uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    });

    const updateFile = useCallback((id: any, data: any) => {
        setUploadedFiles((state) =>
            state.map((file) => (file.id === id ? { ...file, ...data } : file))
        );
    }, []);

    const processUpload = useCallback(
        (uploadedFile: IFile) => {
            const data = new FormData();
            if (uploadedFile.file) {
                data.append("file", uploadedFile.file, uploadedFile.name);
            }

            api
                .post("posts", data, {
                    onUploadProgress: (progressEvent) => {
                        let progress: number = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );

                        console.log(
                            `O arquivo ${uploadedFile.name} está ${progress}% carregada... `
                        );

                        updateFile(uploadedFile.id, { progress });
                    },
                })
                .then((response) => {
                    console.log(
                        `A arquivo ${uploadedFile.name} já foi enviada para o servidor!`
                    );

                    updateFile(uploadedFile.id, {
                        uploaded: true,
                        id: response.data._id,
                        url: response.data.url,
                    });
                })
                .catch((err) => {
                    console.error(
                        `Houve um problema para fazer upload ${uploadedFile.name} no servidor AWS`
                    );
                    console.log(err);

                    updateFile(uploadedFile.id, {
                        error: true,
                    });
                });
        },
        [updateFile]
    );

    const handleUpload = useCallback(
        (files: File[]) => {
            const newUploadedFiles: IFile[] = files.map((file: File) => ({
                file,
                id: uuidv4(),
                name: file.name,
                readableSize: filesize(file.size),
                preview: URL.createObjectURL(file),
                progress: 0,
                uploaded: false,
                error: false,
                url: "",
            }));

            // concat é mais performático que ...spread
            // https://www.malgol.com/how-to-merge-two-arrays-in-javascript/
            setUploadedFiles((state) => state.concat(newUploadedFiles));
            newUploadedFiles.forEach(processUpload);
        },
        [processUpload]
    );

    const handlePdfShow = (i: any) => {
        setPdfShow(i === "false" ? false : true)
        setItem(i)
    }

    const handleShowConfirmDelete = () => {
        deleteFile(itemDeleteId)
        setShowConfirmDelete(!showConfirmDelete)
    }

    const notConfirmeDelete = () => {
        setShowConfirmDelete(false)
    }

    const confirmDelete = (id: string, name: string) => {
        setItemDeleteName(name)
        setItemDeleteId(id)
        setShowConfirmDelete(true)
    }

    const deleteFile = useCallback((id: string) => {
        api.delete(`posts/${id}`);
        setUploadedFiles((state) => state.filter((file) => file.id !== id));
    }, []);

    return (
        <FileContext.Provider value={{
            uploadedFiles, deleteFile, handleUpload,
            pdfShow, item, itemDeleteId, itemDeleteName, setItem, setItemDeleteId,
            setItemDeleteName, setPdfShow, setShowConfirmDelete, showConfirmDelete, handlePdfShow,
            handleShowConfirmDelete, notConfirmeDelete, confirmDelete
        }}>
            {children}
        </FileContext.Provider>
    );
};

function useFiles(): IFileContextData {
    const context = useContext(FileContext);

    if (!context) {
        throw new Error("useFiles must be used within FileProvider");
    }

    return context;
}

export { FileProvider, useFiles, };