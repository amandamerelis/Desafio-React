import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ProjetoModel } from '../../types/projeto.model.ts';
import { useEffect } from 'react';
import { UsuarioModel } from '../../types/usuario.model.ts';

interface DialogProps {
    open: boolean,
    onClose: ((dados: Partial<ProjetoModel> | null) => void),
    dados: ProjetoModel | null,
    usuario: UsuarioModel
}

const FormProjeto = ({ open, onClose, dados, usuario }: DialogProps) => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            titulo: dados?.titulo || '',
            descricao: dados?.descricao || '',
            criador: dados?.criador || usuario,
            participantes: dados?.participantes || [],
            tarefas: dados?.tarefas || []
        },
    });

    useEffect(() => {
        if (open) {
            reset(dados || {
                titulo: '',
                descricao: '',
                criador: usuario,
                participantes: [],
                tarefas: []
            });
        }
    }, [open, dados, reset]);

    const onSubmit = (data: Partial<ProjetoModel>) => {

        const projetoASalvar = {
            ...data,
            id: data?.id,
            criador: data?.criador,
            participantes: data?.participantes || [],
            tarefas: data?.tarefas
        };

        onClose(projetoASalvar);
    };

    const handleFecharFormulario = () => {
        onClose(null);
        reset();
    };

    return (
        <Dialog open={open} maxWidth="sm">
            <DialogTitle>Criar Projeto</DialogTitle>
            <form id="teste" onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Título"
                        {...register('titulo', {
                            required: 'Campo obrigatório.',
                            minLength: { value: 3, message: 'Mínimo de 3 caracteres.' },
                            maxLength: { value: 100, message: 'Máximo de 100 caracteres.' }
                        })}
                        error={!!errors.titulo}
                        helperText={errors.titulo?.message?.toString()}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Descrição"
                        multiline
                        rows={4}
                        {...register('descricao', {
                            required: 'Campo obrigatório.',
                            minLength: { value: 3, message: 'Mínimo de 3 caracteres.' },
                            maxLength: { value: 500, message: 'Máximo de 500 caracteres.' }
                        })}
                        error={!!errors.descricao}
                        helperText={errors.descricao?.message?.toString()}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={handleFecharFormulario} variant="outlined">
                        Cancelar
                    </Button>
                    <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained"
                        sx={{ bgcolor: 'primary.light', color: '#FFF' }}>
                        Salvar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );

};

export default FormProjeto;
