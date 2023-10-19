package capstone.manager.controllers;

import capstone.manager.domain.Result;
import capstone.manager.domain.UserSheetService;
import capstone.manager.models.UserSheet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/userSheet")
public class UserSheetController {

    private final UserSheetService service;

    public UserSheetController(UserSheetService service) {
        this.service = service;
    }

    @GetMapping("/{userId}")
    public List<UserSheet> findSheetsByUserId(@PathVariable int userId) {
        return service.findSheetsByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody UserSheet userSheet) {
        Result<UserSheet> result = service.create(userSheet);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable int id) {
        if (service.deleteById(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteAll/{sheetId}")
    public ResponseEntity<Void> deleteBySheetId(@PathVariable int sheetId) {
        if (service.deleteBySheetId(sheetId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
