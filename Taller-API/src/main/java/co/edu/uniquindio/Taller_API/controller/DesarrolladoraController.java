package co.edu.uniquindio.Taller_API.controller;

import co.edu.uniquindio.Taller_API.entity.Desarrolladora;
import co.edu.uniquindio.Taller_API.service.DesarrolladoraService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/desarrolladoras")
@RequiredArgsConstructor
public class DesarrolladoraController {

    private final DesarrolladoraService service;

    @GetMapping
    public List<Desarrolladora> listar(){
        return service.listarTodas();
    }

    @PostMapping
    public Desarrolladora crear(@RequestBody Desarrolladora desarrolladora){
        return service.guardar(desarrolladora);
    }

    @GetMapping("/{id}")
    public Desarrolladora obtener(@PathVariable Long id){
        return service.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        service.eliminar(id);
    }
}