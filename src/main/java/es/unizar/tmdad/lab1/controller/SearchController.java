package es.unizar.tmdad.lab1.controller;

import es.unizar.tmdad.lab1.service.TwitterLookupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.social.UncategorizedApiException;
import org.springframework.social.twitter.api.SearchResults;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class SearchController {

    @Autowired
    TwitterLookupService twitter;

    @MessageMapping("/search")
    public void search(String query) {
        twitter.search(query);
    }

    @ResponseStatus(value= HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UncategorizedApiException.class)
    public SearchResults handleUncategorizedApiException() {
        return twitter.emptyAnswer();
    }
}