import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { UsuarioModel } from '../../types/usuario.model.ts';
import AvatarComFoto from '../avatar/AvatarComFoto.tsx';
import AvatarComIniciais from '../avatar/AvatarComIniciais.tsx';
import { ProjetoModel } from '../../types/projeto.model.ts';
import { useAuthContext } from '../../contexts/AuthContext.tsx';
import { useEffect, useState } from 'react';
import { UsuarioService } from '../../services/UsuarioService.ts';
import { ProjetoService } from '../../services/ProjetoService.ts';

interface ListaParticipantesProps {
    projeto: ProjetoModel,
    open: boolean,
    onClose: () => void
}

const ListaParticipantes = ({ projeto, open, onClose }: ListaParticipantesProps) => {

    const { usuarioAtual } = useAuthContext();
    const [membrosAtualizados, setMembrosAtualizados] = useState<UsuarioModel[]>([]);
    const [usuarios, setUsuarios] = useState<UsuarioModel[]>([]);

    useEffect(() => {
        if(usuarioAtual && (usuarioAtual.id === projeto.criador.id)){

            UsuarioService.buscarTodos().then(resp => {
                if (resp instanceof Error) {
                    alert(resp.message);
                    setUsuarios([]);
                } else {
                    setUsuarios(resp);
                }
            });

        } else {
            setUsuarios([...projeto.participantes, projeto.criador]);
        }
        setMembrosAtualizados(projeto.participantes);
    }, [projeto, usuarioAtual]);

    const handleSubmit = () => {
        projeto.participantes = membrosAtualizados;
        ProjetoService.atualizarPorId(projeto.id, projeto).then(resp => {
            if (resp instanceof Error) {
                alert(resp.message);
            } else {
                projeto = resp;
                onClose();
            }
        });
        console.log(membrosAtualizados);
    };

    const handleFecharLista = () => {
        onClose();
    };

    const handleToggle = (usuario: UsuarioModel) => () => {
        setMembrosAtualizados(prevMembros => {
            const index = prevMembros.findIndex((membro) => membro.id === usuario.id);

            if (index === -1) {
                return [...prevMembros, usuario];
            } else {
                return prevMembros.filter((_, i) => i !== index);
            }
        });
    };

    const isMembro = (usuario: UsuarioModel): boolean => {
        return membrosAtualizados.some((membro) => membro.id === usuario.id);
    };

    return !usuarioAtual ? (<></>) : (
        <Dialog open={open} maxWidth="sm">
            <DialogTitle>Lista de participantes</DialogTitle>
            <DialogContent>
                <List>
                    {usuarios.map(usuario => (
                        <Box key={usuario.id}>
                            <Divider variant="inset" component="li"/>
                            <ListItem
                                disablePadding
                                secondaryAction={projeto.criador.id === usuarioAtual.id &&
                                          <Checkbox
                                              edge="end"
                                              onChange={handleToggle(usuario)}
                                              disabled={usuario.id === projeto.criador.id}
                                              checked={isMembro(usuario) || usuario.id === projeto.criador.id}
                                          />
                                }>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        {usuario.urlFoto
                                            ?
                                            <AvatarComFoto tamanho="medio" estilo="rounded" urlFoto={usuario.urlFoto}/>
                                            : <AvatarComIniciais tamanho="medio" estilo="rounded" nome={usuario.nome}/>}
                                    </ListItemAvatar>
                                    <ListItemText primary={usuario.nome}/>
                                </ListItemButton>
                            </ListItem>
                        </Box>
                    ))}

                </List>
            </DialogContent>

            <DialogActions>
                <Button type="button" onClick={handleFecharLista} variant="outlined">
                    Cancelar
                </Button>
                {projeto.criador.id === usuarioAtual.id && <Button variant="contained"
                    sx={{ bgcolor: 'primary.light', color: '#FFF' }}
                    onClick={handleSubmit}>Salvar</Button>}
            </DialogActions>
        </Dialog>

    );
};

export default ListaParticipantes;
