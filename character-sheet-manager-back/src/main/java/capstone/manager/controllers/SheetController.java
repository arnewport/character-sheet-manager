package capstone.manager.controllers;

import capstone.manager.domain.Result;
import capstone.manager.domain.SheetService;
import capstone.manager.models.Sheet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/sheet")
public class SheetController {

    private final SheetService service;

    public SheetController(SheetService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sheet> findById(@PathVariable int id) {
        Sheet sheet = service.findById(id);
        if (sheet == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(sheet);
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Sheet sheet) {
        Result<Sheet> result = service.create(sheet);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable int id, @RequestBody Sheet sheet) {
        if (id != sheet.getId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Sheet> result = service.update(sheet);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable int id) {
        if (service.deleteById(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
