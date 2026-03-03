package co.edu.uniquindio.Taller_API.service;

import co.edu.uniquindio.Taller_API.entity.Desarrolladora;
import co.edu.uniquindio.Taller_API.exception.ResourceNotFoundException;
import co.edu.uniquindio.Taller_API.repository.DesarrolladoraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DesarrolladoraService {

    private final DesarrolladoraRepository repository;

    public List<Desarrolladora> listarTodas(){
        return repository.findAll();
    }

    public Desarrolladora obtenerPorId(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Desarrolladora no encontrada"));
    }

    public Desarrolladora guardar(Desarrolladora desarrolladora){
        return repository.save(desarrolladora);
    }

    public void eliminar(Long id){
        Desarrolladora desarrolladora = obtenerPorId(id);
        repository.delete(desarrolladora);
    }
}