import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Add } from '@mui/icons-material';
import { stringToColor } from '../../utils/funcoesUteis.ts';
import { TarefaModel } from '../../types/tarefa.model.ts';
import { useEffect, useState } from 'react';

interface DialogProps {
    open: boolean,
    onClose: ((dados: Partial<TarefaModel> | null) => void),
    dados: TarefaModel | null
}

const FormTarefa = ({ open, onClose, dados }: DialogProps) => {

    const [tagInputValue, setTagInputValue] = useState('');

    const theme = useTheme();
    const {
        register,
        reset,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            titulo: dados?.titulo || '',
            descricao: dados?.descricao || '',
            tags: dados?.tags || []
        },
    });

    useEffect(() => {
        if (open) {
            reset(dados || {
                titulo: '',
                descricao: '',
                tags: []
            });
        }
    }, [open, dados, reset]);

    const tags = watch('tags');

    const handleAddChip = () => {

        if (tagInputValue.trim()) {
            if (tagInputValue.trim().length <= 30 && !tags.includes(tagInputValue)) {
                setValue('tags', [...tags, tagInputValue]);
                setTagInputValue('');
            }
        }

    };

    const handleDeleteChip = (tagAExcluir: string) => {
        setValue('tags', tags.filter((tag) => tag !== tagAExcluir));
    };

    const onSubmit = (data: Partial<TarefaModel>) => {

        const tarefaASalvar = {
            ...data,
            id: data?.id,
            criador: data?.criador,
            dataCriacao: data?.dataCriacao,
            situacao: data?.situacao
        };

        onClose(tarefaASalvar);
    };

    const handleFecharFormulario = () => {
        onClose(null);
        reset();
    };

    return (
        <Dialog open={open} maxWidth="sm">
            <DialogTitle>Criar Task</DialogTitle>
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                        <Box sx={{ display: 'flex', width: '100%', gap: 2, alignItems: 'felx-start' }}>
                            <TextField sx={{ flexGrow: 1 }}
                                label="Adicionar Tag"
                                value={tagInputValue}
                                onChange={(e) => setTagInputValue(e.target.value)}
                                helperText="Tamanho máximo da tag é de 30 caracteres."
                            />
                            <Button sx={{
                                bgcolor: 'background.default',
                                color: 'text.primary',
                                height: 56
                            }} type="button" variant="contained" startIcon={<Add/>} onClick={handleAddChip}>
                                Criar
                            </Button> </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {tags.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    onDelete={() => handleDeleteChip(tag)}
                                    sx={{
                                        borderRadius: 1,
                                        p: 1,
                                        bgcolor: stringToColor(tag),
                                        color: theme.palette.getContrastText(stringToColor(tag)),
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
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

export default FormTarefa;
